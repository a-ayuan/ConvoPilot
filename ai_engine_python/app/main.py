import os
import time
from mcts import mcts_search, ConversationState
from dotenv import load_dotenv
from google import genai
from prompts import (
    system_prompt, generate_context_prompt, generate_past_messages_prompt,
    generate_goal_prompt, generate_user_prompt, generate_response_prompt, generate_message_type_prompt
)
from evaluate import score_message

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")
client = genai.Client(api_key=GEMINI_API_KEY)

def optimize_message(user_context, message_type, past_messages, goal, user_input):
    test_prompt = (
        system_prompt
        + generate_context_prompt(context=user_context)
        + generate_message_type_prompt(message_type=message_type)
        + generate_past_messages_prompt(past_messages=past_messages)
        + generate_goal_prompt(goal=goal)
        + generate_user_prompt(user_input=user_input)
    )

    def is_too_similar(variant: str, original: str, threshold: float = 0.8):
        variant_lower = variant.lower()
        original_lower = original.lower()
        variant_words = set(variant_lower.split())
        original_words = set(original_lower.split())
        if not original_words:
            return False
        intersection = len(variant_words.intersection(original_words))
        union = len(variant_words.union(original_words))
        if union == 0:
            return False
        similarity = intersection / union
        contains_original = original_lower in variant_lower or variant_lower in original_lower
        return similarity > threshold or contains_original

    def generate_variants(message: str, target_variants: int = 3):
        variants = []
        while len(variants) < target_variants:
            try:
                generation_prompt = (
                    test_prompt
                    + "\n\nGenerate exactly 1 completely unique and optimized message in the correct <MESSAGE_ TYPE> that is SUBSTANTIALLY DIFFERENT from the original message below. Use different wording, structure, and approach. Do not repeat or closely paraphrase the original message.\n\nOriginal message: "
                    + message
                )
                response = client.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=generation_prompt
                )
                if hasattr(response, "text") and response.text.strip():
                    variant = response.text.strip()
                    if (not is_too_similar(variant, message)
                        and not any(is_too_similar(variant, existing) for existing in variants)):
                        variants.append(variant)
            except Exception:
                time.sleep(1)
        return variants

    initial_state = ConversationState(message=user_input)
    best_message, all_messages = mcts_search(
        initial_state=initial_state,
        generate_variants_fn=generate_variants,
        evaluate_fn=score_message,
        iterations=15,
        return_all=True
    )
    # Return top 3 messages sorted by score
    sorted_msgs = sorted(all_messages, key=lambda x: x['final_score'], reverse=True)
    return {
        "bestMessage": best_message,
        "suggestions": sorted_msgs[:3],
        "score": sorted_msgs[0]['final_score'],
        "stats": [
            {"visit": m['visits'], "score": m['final_score']}
            for m in sorted_msgs[:3]
        ]
    }

if __name__ == "__main__":
    import argparse, json
    parser = argparse.ArgumentParser()
    parser.add_argument("--user_context", required=True)
    parser.add_argument("--message_type", required=True)
    parser.add_argument("--past_messages", required=True)
    parser.add_argument("--goal", required=True)
    parser.add_argument("--user_input", required=True)
    args = parser.parse_args()
    result = optimize_message(
        args.user_context, args.message_type, args.past_messages, args.goal, args.user_input
    )
    print(json.dumps(result, indent=2))