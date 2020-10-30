
from lib.db import get_entry, write_entry


def process_new(environment, settings, new_model, new_checkpoints, redis):
    existing_entry = get_entry(environment, settings, redis)

    if existing_entry:
        if new_checkpoints < existing_entry["checkpoints"]:
            return "better model exists"

    write_entry(environment, settings, new_model, new_checkpoints, redis)
    return "new model saved"
