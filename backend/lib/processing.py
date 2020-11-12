def process_new(environment, settings, new_model, new_checkpoints, solved, db):
    existing_entry = db.get_entry(environment, settings)

    if existing_entry:
        if not solved:
            return "exists and did not solve"

        if new_checkpoints <= existing_entry["checkpoints"]:
            return "better or equal model exists"

    db.write_entry(environment, settings, new_model,
                new_checkpoints, solved)
    return "new model saved"
