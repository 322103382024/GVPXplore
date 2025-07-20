import React, { useState } from 'react';
import './Payment.css';

function Payment() {
    const [formData, setFormData] = useState({
        rollNumber: '',
        name: '',
        branch: '',
        email: '',
        mobile: '',
        feeType: '',
        remarks: '',
        termsAccepted: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.termsAccepted) {
            alert('Please accept the terms and conditions.');
            return;
        }

        // Later replace this with your payment gateway integration
        alert('Proceeding to payment...');
    };

    return (
        <div className="payment-container">
            <h2>Payment Form</h2>
            <form onSubmit={handleSubmit} className="payment-form">
                <label>Roll Number:</label>
                <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />

                <label>Name of the Student:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Branch:</label>
                <select name="branch" value={formData.branch} onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                </select>

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Mobile Number:</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

                <label>Fee Type:</label>
                <select name="feeType" value={formData.feeType} onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    <option value="Exam Fee">Exam Fee</option>
                    <option value="Tuition Fee">Tuition Fee</option>
                    <option value="Library Fine">Library Fine</option>
                </select>

                <label>Remarks:</label>
                <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>

                <div className="terms">
                    <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                    <span>I accept below Terms & Conditions</span>
                </div>

                {/* 👉 PLACE TO INSERT QR IMAGE */}
                <div className="qr-section">
                    <p><strong>Scan QR to Pay:</strong></p>
                    <img src="payment_qr.jpg" alt="QR Code" className="qr-image" />
                </div>

                <div className="amount">
                    <span>INR</span>
                    <span className="fee">100</span>
                </div>

                <button type="submit" className="pay-btn">Pay Now</button>
            </form>
        </div>
    );
}

export default Payment;
