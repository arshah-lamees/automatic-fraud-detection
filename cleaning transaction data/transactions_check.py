from app.database import SessionLocal
from app.models import Transaction

def main():
    db = SessionLocal()
    transactions = db.query(Transaction).all()
    columns = [
        'id', 'client_id', 'card_id', 'amount', 'use_chip', 'merchant_id', 'merchant_city',
        'merchant_state', 'zip', 'mcc', 'hour', 'dayofweek', 'is_weekend',
        'error_0', 'error_1', 'error_2', 'error_3', 'error_4', 'error_5'
    ]
    with open('transactions_report.txt', 'w', encoding='utf-8') as f:
        f.write(' '.join(f"{col:<15}" for col in columns) + '\n')
        f.write('-' * (len(columns) * 15) + '\n')
        for t in transactions:
            f.write(' '.join(f"{getattr(t, col, '')!s:<15}" for col in columns) + '\n')
    db.close()
    print("Database content has been written to transactions_report.txt.")

if __name__ == "__main__":
    main() 