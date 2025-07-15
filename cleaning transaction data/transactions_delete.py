from app.database import SessionLocal
from app.models import Transaction
import os

def delete_all_transactions():
    db = SessionLocal()
    db.query(Transaction).delete()
    db.commit()
    db.close()
    print("All transactions have been deleted from the database.")

    # Clear the contents of transactions_report.txt if it exists
    with open('transactions_report.txt', 'w', encoding='utf-8') as f:
        f.write('')
    print("transactions_report.txt has been cleared.")

if __name__ == "__main__":
    delete_all_transactions() 