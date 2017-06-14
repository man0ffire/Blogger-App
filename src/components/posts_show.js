import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount(){
    //this comes from react router
    const id = this.props.match.params.id;
    this.props.fetchPost(id);
  }

  onDeleteClick(){
    const id = this.props.match.params.id;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    //same as const post = this.props.post
    const {post} = this.props;

    if (!post) {
      return <div className='container'><h4>Loading...</h4></div>
    }

    return (
      <div className='container'>
        <Link to='/'>Back to Index</Link>
        <button
          className='btn btn-danger pull-right'
          onClick={this.onDeleteClick.bind(this)}
        >
        Delete Post!
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({posts}, ownProps){
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
