import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { ModalFragment, ModalPopup } from './components/ReactModal';
import InfiniteScroll from 'react-infinite-scroll-component';
const Headers = [
  { caption: 'Picture', id: 11 },
  { caption: 'Name', id: 1 },
  { caption: 'Date of Birth', id: 2 },
  { caption: 'Email Address', id: 3 },
  { caption: 'Phone Number', id: 4 },
  { caption: 'Time-zone', id: 44 },
  { caption: 'Address', id: 5 },
]



function App() {
  const [UserData, setUserData] = useState([])
  const [Modal, showModal] = useState(false);
  const [ModalData, setModalData] = useState([]);
  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=20')
      .then(response => {
        setUserData(response.data?.results)
      })
      .catch(error => console.log('Something is not alright', error))
  }, [])

  const fetchMoreData = () => {
    setTimeout(() => {
      axios.get('https://randomuser.me/api/?results=20')
        .then(response => {
          setUserData(prev => prev.concat(response?.data?.results))
        })
        .catch(error => console.log('Something is not alright', error))
    }, 2000)
  }
  const TableDataManager = (data) => {
    let temp = {
      photo: <img src={data?.picture?.thumbnail} alt='' />,
      name: data?.name?.title + ". " + data?.name?.first + ' ' + data?.name?.last,
      dob: new Date(data?.dob?.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }),
      email: data?.email,
      phone: data?.phone,
      timezone: data?.location?.timezone?.offset + ', ' + data?.location?.timezone?.description,
      address: "Street No: " + data?.location?.street?.number + ', ' + data?.location?.street?.number
        + data?.location?.city + ', ' + data?.location?.state + ', ' + data?.location?.country + ', ' + data?.location?.postcode,
    }
    return temp;
  }

  const onClickHandler = data => {
    showModal(true);
    setModalData(data)
  }
  return (
    <>
      <InfiniteScroll
        dataLength={UserData.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {<section className='app_container'>
          <table className='table_container'>
            <thead>
              {Headers.map(head => (
                <th key={head.id}>{head.caption}</th>
              ))}
            </thead>
            <tbody>
              {UserData?.map(user => (<tr key={user?.phone} onClick={() => onClickHandler(user)}>
                {Object.values(TableDataManager(user)).map(dt => (
                  <td>{dt}</td>
                ))}
              </tr>))}
            </tbody>
          </table>
        </section>
        }
      </InfiniteScroll>
      {Modal && <ModalPopup isOpen={Modal} setShowModal={showModal}>
        <ModalFragment data={ModalData} onClickClose={() => showModal(false)} />
      </ModalPopup>}
    </>
  );
}

export default App;
