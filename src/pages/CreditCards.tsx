import { CreditCard, Plus } from "lucide-react";
import "./CreditCards.css";

export default function CreditCards() {
  return (
    <section className="credit-cards-page">
      <div className="panel credit-cards-summary">
        <div>
          <span className="sub">TOTAL OUTSTANDING</span>
          <h2>₹0.00</h2>
          <p>No credit card balances added yet.</p>
        </div>

        <button className="primary" type="button">
          <Plus size={16} />
          Add Card
        </button>
      </div>

      <div className="panel credit-cards-empty">
        <div className="credit-card-empty-icon">
          <CreditCard size={28} />
        </div>
        <h3>No credit cards added</h3>
        <p>
          Add your credit cards to track outstanding balances,
          credit limits and available credit.
        </p>
      </div>
    </section>
  );
}
