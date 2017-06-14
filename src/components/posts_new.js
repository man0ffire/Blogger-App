import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
  renderField(field){
    const className=`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='help-block'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values){
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div className='container'>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label='Title'
            name='title'
            component={this.renderField}
          />
          <Field
            label='Categories'
            name='categories'
            component={this.renderField}
          />
          <Field
            label='Post Content'
            name='content'
            component={this.renderField}
          />
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to='/' className= 'btn btn-danger'>Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};
  //validations
  //the value property (title, categories...ets) must be the same
  //as the field we validate so we can use field.meta.error
  //in our render function to show the error string we asign
  if(!values.title){
    errors.title = "Enter a title!";
  }
  if(!values.categories){
    errors.categories = "Enter some categories!";
  }
  if(!values.content){
    errors.content = "Enter some content please!";
  }
  //if errors is empty it is fine
  //if it has *any* props, redux will assum form is invalid
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
