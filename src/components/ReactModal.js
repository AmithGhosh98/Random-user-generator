import React from 'react'
import ReactModal from "react-modal";
import closeIcon from './../assets/CloseIcon.png'
ReactModal.setAppElement('#root')
export function ModalPopup({ isOpen, setShowModal, children }) {
    return (<>
        <div >
            <ReactModal isOpen={isOpen} shouldCloseOnOverlayClick={false} preventScroll={false}
                onRequestClose={() => setShowModal(false)}
                portalClassName='backdrop'
                style={{
                    overlay: {
                        position: 'fixed',
                        top: '25%',
                        left: '25%',
                        width: '50%',
                        height: '35%',
                        background: ' #FFFFFF 0% 0% no-repeat padding-box',
                        boxShadow: ' 6px 6px 45px #00000066',
                        border: ' 1px solid #ECEEF1',
                        // border: ' 5px solid black',
                        opacity: '1',
                    },
                    content: {
                        // position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '5px',
                        border: 'none',
                        background: 'none',
                        overflow: 'none',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '2em'
                    }
                }}>
                {children}
            </ReactModal>
        </div>
    </>)
}


export function ModalFragment({ data, onClickClose }) {
    return (
        <>
            <section className='modal_container'>
                <img src={data?.picture?.large} alt='' width='200' height='200' />
                <p> <div id='whatever'>  {data?.name?.title}. {data?.name?.first} {data?.name?.last}</div>
                    {data?.gender === 'male' ? 'He ' : 'She '} is registered into the account on {data?.registered?.date} at an age of {data?.registered?.age} with the Unique ISBN id {data?.login?.uuid}.
                    {data?.gender === 'male' ? 'He ' : 'She '} belongs to the Nationality {data?.location?.country}, under the {data?.location?.state} state jurisdiction bearing the postal code {data?.location?.postcode}.
                    An agent can reach the {data?.gender === 'male' ? 'him' : 'her'}, using the email address {data?.email}. The registered phone number and cell are {data?.phone} and {data?.cell} respectively, in case of any funds withdrawal emergencies.
                </p>
                <img src={closeIcon} alt='' width='20px' height='20px' onClick={onClickClose} />
            </section>
        </>
    )
}


