type IModal = {
    children: JSX.Element;
    isOpen: boolean;
    onClose: VoidFunction;
    title: string;
}

const Modal = (props:IModal) => {
    return <div className={`${!props.isOpen ? "modal-close" : "modal"}`}>
        <div className="modal-contaier">
            <div className="modal_head">
                <h2>{props.title}</h2>
                <span onClick={props.onClose} className="close">&times;</span>
            </div>
            <div className="modal_body">
                {props.children}
            </div>
        </div>
    </div>
}

export default Modal;