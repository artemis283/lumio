from pulp import LpProblem, LpMinimize, LpVariable, LpInteger, LpContinuous, LpStatusOptimal

balances: dict[str, int] = {
    "alex": 95,
    "joana": -65,
    "lina": -40,
    "mischel": 100,
    "gonzalo": -150,
    "andre": 60,
}

problem = LpProblem("who pays who", LpMinimize)

# Dicts for variables
who_pays_who_variables: dict[tuple[str, str], LpVariable] = {}
how_much_who_pays_who_variables: dict[tuple[str, str], LpVariable] = {}

# Define variables
for person_name, _ in balances.items():
    for another_person_name, _ in balances.items():
        if person_name == another_person_name:
            continue
        who_pays_who_var = LpVariable(
            f"who_pays_who_{person_name}_{another_person_name}",
            lowBound=0,
            upBound=1,
            cat=LpInteger,
        )
        who_pays_who_variables[(person_name, another_person_name)] = who_pays_who_var

        how_much_who_pays_who_var = LpVariable(
            f"how_much_who_pays_who_{person_name}_{another_person_name}",
            lowBound=0,
            upBound=None,
            cat=LpContinuous,
        )
        how_much_who_pays_who_variables[(person_name, another_person_name)] = how_much_who_pays_who_var

# Linking the two sets of variables
for person_name, _ in balances.items():
    for another_person_name, _ in balances.items():
        if person_name != another_person_name:
            problem += how_much_who_pays_who_variables[(person_name, another_person_name)] <= \
                        1000 * who_pays_who_variables[(person_name, another_person_name)]  # Adjusted max amount to 1000 for flexibility

# Constraints for negative balances (debt)
for person, amount in balances.items():
    if amount < 0:
        this_person_how_much_vars = []
        for var_key in how_much_who_pays_who_variables.keys():
            from_person, _ = var_key
            if from_person == person:
                this_person_how_much_vars.append(
                    how_much_who_pays_who_variables[var_key]
                )
        problem += sum(this_person_how_much_vars) == abs(amount)

# Constraints for positive balances (credit)
for person, amount in balances.items():
    if amount > 0:
        this_person_how_much_vars = []
        for var_key in how_much_who_pays_who_variables.keys():
            _, to_person = var_key
            if to_person == person:
                this_person_how_much_vars.append(
                    how_much_who_pays_who_variables[var_key]
                )
        problem += sum(this_person_how_much_vars) == abs(amount)

# Objective: Minimize the number of payments or total amount exchanged
problem.objective = sum(who_pays_who_variables.values())

status = problem.solve()

assert status == LpStatusOptimal

# Print the result in a readable format
for (from_person, to_person), vvar in how_much_who_pays_who_variables.items():
    if vvar.varValue > 0:  # Only print when there's a payment
        print(f"{from_person.capitalize()} owes {to_person.capitalize()} {vvar.varValue:.2f} EUR")

print("Sum of balances:", sum(balances.values()))

