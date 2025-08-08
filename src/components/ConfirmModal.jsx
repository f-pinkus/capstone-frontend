import React from "react";

export function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <>
      <div className="modal-backdrop" />
      <div className="modal-card">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn btn-confirm" onClick={onConfirm}>Delete</button>
        </div>

        <style>{`
          .modal-backdrop {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 1000;
          }
          .modal-card {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #f9f6f4ff;
            border: 1px solid #ecd7d0;
            border-radius: 12px;
            padding: 2rem 3rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            max-width: 400px;
            width: 90%;
            font-family: 'Nunito', sans-serif;
            color: #5a3a39;
            text-align: center;
          }
          .modal-buttons {
            margin-top: 1.8rem;
            display: flex;
            justify-content: center;
            gap: 1rem;
          }
          .btn {
            padding: 0.5rem 1.2rem;
            border-radius: 12px;
            font-weight: 600;
            font-family: 'Nunito', sans-serif;
            cursor: pointer;
            border: none;
            transition: background-color 0.3s ease;
          }
          .btn-cancel {
            background-color: #ccc;
            color: #333;
          }
          .btn-cancel:hover {
            background-color: #bbb;
          }
          .btn-confirm {
            background-color: #800020;
            color: white;
          }
          .btn-confirm:hover {
            background-color: #660018;
          }
        `}</style>
      </div>
    </>
  );
}
