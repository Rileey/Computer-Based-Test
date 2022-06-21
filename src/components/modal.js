import './modal.css'

const Modal = ({closeModal}) => {
    return(
        <div>
            <div className="modal">
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Title</h4>
          </div>
          <div className="modal-body">Children</div>
          <div className="modal-footer">
            <button onClick={()=>closeModal(false)} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Modal 