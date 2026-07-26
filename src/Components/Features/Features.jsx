import {
  FaTags,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
  FaCreditCard,
} from "react-icons/fa";
import "./Features.css"

const Features = () => {
    return (
        <>
        <div className="features-section">
  <div className="feature-card">
    <div className="feature-icon">
      <FaTags />
    </div>
    <div>
      <h5>Great Prices</h5>
      <p>Best prices every day</p>
    </div>
  </div>

  <div className="feature-card">
    <div className="feature-icon">
      <FaShieldAlt />
    </div>
    <div>
      <h5>Assured Quality</h5>
      <p>100% Original products</p>
    </div>
  </div>

  <div className="feature-card">
    <div className="feature-icon">
      <FaTruck />
    </div>
    <div>
      <h5>Fast Delivery</h5>
      <p>Quick delivery at your door</p>
    </div>
  </div>

  <div className="feature-card">
    <div className="feature-icon">
      <FaUndoAlt />
    </div>
    <div>
      <h5>Easy Returns</h5>
      <p>Hassle-free returns</p>
    </div>
  </div>

  <div className="feature-card">
    <div className="feature-icon">
      <FaCreditCard />
    </div>
    <div>
      <h5>Secure Payments</h5>
      <p>100% secure payments</p>
    </div>
  </div>
</div>
        </>
    )
}

export default Features;