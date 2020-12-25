import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import { Col, Container, Row } from 'react-bootstrap';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
   <Container>
       <Row>
    <Col>
        <div style={{display:"block", marginLeft:"auto",marginRight:"auto",width:"40%"}} class="panel panel-default">
          <div class="panel-heading">
          <h4 style={{textAlign:"center"}}>Song Details</h4>
            <h3 style={{textAlign:"center"}} class="panel-title">
              {this.state.board.title}
            </h3>
          </div>
          <div >
            <dl style={{textAlign:"center"}}>
              <dt>Author:</dt>
              <dd>{this.state.board.author}</dd>
              <dt> Image:</dt>

            <dt><img src="https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/MP3.png"style={{ height:"300px", paddingBottom:"10px"}}/></dt>
            <dt><ReactAudioPlayer
                    src={this.state.board.music}
                    controls
                      /></dt>
            <dt><Link to={`/edit/${this.state.key}`} class="btn btn-success" > Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button></dt>
            </dl>
            <div >
            </div>
          </div>
          <h4 style={{textAlign:"center"}}><Link to="/">Song List</Link></h4>

        </div>
        </Col>
        </Row>
        </Container>
    );
  }
}

export default Show;