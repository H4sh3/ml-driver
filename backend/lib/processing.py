
from lib.db import get_entry, write_entry


def process_new(environment, settings, new_model, new_checkpoints, solved, redis):
    existing_entry = get_entry(environment, settings, redis)

    if existing_entry:
        if not solved:
            return "exists and did not solve"

        if new_checkpoints <= existing_entry["checkpoints"]:
            return "better or equal model exists"

    write_entry(environment, settings, new_model,
                new_checkpoints, solved, redis)
    return "new model saved"
