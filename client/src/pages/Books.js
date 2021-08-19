import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch,} from "react-redux";
import { Link } from "react-router-dom";
import BookBox from "../components/BookBox";
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import Img1 from "../CaruselImg/Img1.jpg"
import Img2 from "../CaruselImg/Img2.jpg"
import Img3 from "../CaruselImg/Img3.jpg"
import ModalBody from 'react-bootstrap/ModalBody'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import { getBooksThunk, getBookCountThunk, updateCurrentPage, getSearchBooks } from '../redux/booksSlice'
import {users} from "../redux/userSlice"
import Form from 'react-bootstrap/Form'
import "../index.css"

export const Books = () =>{
    const [check,setCheck] = useState(0)
    const [word,setWord] = useState("")
    const inputRef = useRef()
    const checkRef = useRef()
    const books = useSelector(state => state.books.books);
    const limit = useSelector(state => state.books.limit)
    const filtr = useSelector(state => state.books.filtrbooks)
    const pageCount = useSelector(state => state.books.pageCount)
    const currentPage = useSelector(state => state.books.currentPage)
    const dispatch = useDispatch();
    const token = useSelector(state => state.users.token)
    useEffect(() => { dispatch(getBookCountThunk(token)) }, [])
    useEffect(() => { dispatch(getBooksThunk(currentPage, limit,token)) }, [currentPage])
    
    const handleChangePage = (newPage) => {
        dispatch(updateCurrentPage(newPage))
    }
    
    let pages = []
    for(let i = 1; i <= pageCount; i++) {
        pages.push(
            {
                number: i,
                ref: `./books?page=${i}`
            }
        )
    }
   
    const searchHandler = () => {
        const inputValue =  inputRef.current.value
        const checkValue = checkRef.current.value
         dispatch(getSearchBooks(inputValue,checkValue,token))
        
        
    }
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }
    

    
    return(
        <div className = "container-fluid bookscont">
             <div style={{ display: 'block', width: "80%", padding: 30 , margin: "0 auto"}}>
                <Carousel interval={2000}>
                <Carousel.Item style={{'height':"400px"}}>
                    <img
                    className="d-block w-100"
                    src= {Img1}
                    
                    height = {400}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    {values.map((v, idx) => (
                            <Button key={idx}  variant="secondary"  className="" onClick={() => handleShow(v)}>
                                More
                            {typeof v === 'string' && `below ${v.split('-')[0]}`}
                            </Button>
                        ))}
                        <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                   
                                    <Modal.Body>
                                    <ListGroup>
                                    <ListGroup.Item variant="dark">Annabel Pitcher “My Sister Lives on the Mantelpiece”</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">
                                        To ten-year-old Jamie, his family has fallen apart because of the loss of someone he barely remembers: his sister Rose, who died five years ago in a terrorist bombing.
                                        To his father, life is impossible to make sense of when he lives in a world that could so cruelly take away a ten-year-old girl. To Rose's surviving fifteen year old twin, Jas, everyday she lives in Rose's ever present shadow, forever feeling the loss like a limb, but unable to be seen for herself alone.
                                        Told with warmth and humor, this powerful novel is a sophisticated take on one family's struggle to make sense of the loss that's torn them apart... and their discovery of what it means to stay together.
                                    </ListGroup.Item>
                                    <ListGroup.Item variant="dark">Stefan Zweig “Beware of Pity”</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">
                                    The young lieutenant Anton Hofmiller is invited to the castle of the wealthy Hungarian Lajos Kekesfalva. He meets Kekesfalva's paralyzed daughter Edith and develops subtle affection 
                                    and deep compassion for her. Edith falls in love with him. When she develops a hope for a speedy recovery, he eventually promises to marry her when she is recovered, with the hope that
                                    this will convince her to take the treatment. However, for fear of ridicule and contempt, he denies the engagement in public. When Edith learns of this, she takes her own life. Overwhelmed by guilt, he is deployed to the First World War.
                                    </ListGroup.Item>
                                    <ListGroup.Item variant="dark">Marc Levy “The Shadow Thief”</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">
                                    An entertaining and moving novel about first loves, friendship, and dreams, The Shadow Thief tells the story of a boy who grows up with a special gift:
                                    He can steal other people's shadows - and the shadows confide secrets in him.
                                    These dark reflections come and go, revealing hidden insights into the person they belong to.
                                    </ListGroup.Item>
                                    <ListGroup.Item variant="dark">Éric-Emmanuel Schmitt “Oscar and the Lady in Pink”</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">
                                    My name is Oscar and I'm ten years old . . . They call me Egghead and I look about seven. I live in hospital because of my cancer and I've never written to you because I don't even know if you exist,'
                                     writes Oscar in a letter to God. Oscar is ill and no one, especially not his parents, will tell him what he already knows: that he is dying. Granny Rose, the oldest of the 'ladies in pink' who visit Oscar and his fellow patients, makes friends with him. 
                                     She suggests that he play a game: to pretend that each of the following twelve days is a decade of his imagined future. One day equals ten years, and every night Oscar writes a letter to God telling him about his life. The ten letters that follow are sensitive, funny, 
                                     heartbreaking and, ultimately, uplifting. Oscar and the Lady in Pink is a small fable with a big heart; it will change the way you feel about death, and life.
                                    </ListGroup.Item>
                                    <ListGroup.Item variant="dark">Ken Kesey “One Flew Over the Cuckoo’s Nest”</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">
                                    In this classic novel, Ken Kesey’s hero is Randle Patrick McMurphy, a boisterous, brawling, fun-loving rebel who swaggers into the world of a mental hospital and takes over. A lusty, life-affirming fighter, McMurphy rallies the other patients around him by challenging the dictatorship of 
                                    Nurse Ratched. He promotes gambling in the ward, smuggles in wine and women, and openly defies the rules at every turn. But this defiance, which starts as a sport, soon develops into a grim struggle, an all-out war between two relentless opponents: Nurse Ratched, backed by the full power of authority, 
                                    and McMurphy, who has only his own indomitable will. What happens when Nurse Ratched uses her ultimate weapon against McMurphy provides the story’s shocking climax.
                                    </ListGroup.Item>
                                    </ListGroup>
                                    </Modal.Body>
                        </Modal>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{'height':"400px"}}>
                    <img
                    className="d-block w-100"
                    src={Img2}
                    width = {500}
                    height = {400}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item style={{'height':"400px"}}>
                    <img
                    className="d-block w-100"
                    src= {Img3}
                    width = {500}
                    height = {400}
                    alt="Third slide"
                    />
                </Carousel.Item>
                </Carousel>
                </div>
                <div className = "container-fluid bookfiltr">
                <div className = "searchform">
                <Form.Control ref = {inputRef} type ="text" value ={word} onChange = {e => setWord(e.target.value)} className ="mb-2 searchinput"/>
                </div>
                <Button variant="outline-secondary"  className = "searchbtn" onClick = {searchHandler}>
                        Search
                </Button>
                <div>
                    <div className = "form-check form-check-inline">
                            <input ref = {checkRef} className ="form-check-input" type="checkbox" id="inlineCheckbox1"  onChange ={ e => setCheck(e.target.value)} value={1}/>
                            <label className ="form-check-label" >A-Z</label>
                     </div>
                            <div className ="form-check form-check-inline">
                            <input ref = {checkRef}  className ="form-check-input" type="checkbox" id="inlineCheckbox2"  onChange ={e=> setCheck(e.target.value)} value={-1}/>
                            <label className ="form-check-label" >Z-A</label>
                    </div>
                </div>
                </div>
             <div className = "container-fluid bookbox">
            <Row xs={1} md={2} lg={3} className="g-4">
                { books && books.length > 0 && books.map(book => {
                    return(
                            <div>
                                <BookBox book = {book} key = {book._id}/> 
                            </div>
                    )
                }) }
            </Row>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                {pages.map(page => 
                    <Pagination className=" pagination-sm paginate"> 
                        <Pagination.Item className = "page-item">
                            <Link to={page.ref} className="page-link" onClick={() => handleChangePage(page.number)}>
                        {page.number}
                        </Link> </Pagination.Item> 
                    </Pagination>
                
                )}
            </div>
        </div>
    )   
}