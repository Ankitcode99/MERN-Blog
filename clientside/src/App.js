import './App.css';

const React = require('react')
const axios = require('axios')


class App extends React.Component
{

  componentDidMount = () => {
    this.getBlogPosts()
  }

  state = {
    title:'',
    body:'',
    author:'',
    posts : []
  }

  handleChange = (event) =>{
    const target = event.target;// field in which we are typing
    const name = target.name;// name of field
    const value = target.value;

    this.setState({
      [name]:value
    })
  }

  submit = (event)=>{
    event.preventDefault();
    
    const payload = {
      title : this.state.title,
      body : this.state.body,
      author : this.state.author
    }

    axios({
      url:'/api/save',
      method : 'POST',
      data : payload
    })
    .then(()=>{
      console.log('Data saved successfully');
      this.setState({
        title : '',
        body:'',
        author:''
      })

      this.getBlogPosts()
    })
    .catch(()=>{
      alert('An error occurred while saving the data');
    });
  }


  getBlogPosts = () =>{
    axios.get('/api/')
    .then((response)=>{
      const data = response.data;
      this.setState({
        posts : data
      })
      console.log('Data received successflly')
    })
    .catch(()=>{
      alert('Failed to fetch data from DB!')
    })
  }

  deleteBlog = (event) =>{
    event.preventDefault();
    const target = event.target
    const taskId = target.id
    axios.delete(`/api/${taskId}`)
    .then(()=>{
      console.log('Task deleted successfully!')
      this.getBlogPosts()
    })
    .catch(()=>{
      alert('Error deleting blog post!')
    })
    // return;
  }

  displayBlogPosts = (posts) =>{
    if(!posts.length)
    {
      return <h1>Alas! No blog available... Why don't you write one! &#128521; </h1>;
    }

    posts.reverse()

    console.log(posts.length," Posts available")
    return posts.map((curr,index)=>(
      <div key={index} className = "blog-post__display">
        <span className = 'postHead'>
        <h2 className='blogTitle'>{curr.title}</h2>
        
        <button className = 'button blogButton' id = {curr._id} onClick={this.deleteBlog}> DELETE </button>
        </span>
        <hr></hr>
        <p>{curr.body}</p>
        <h4>Authored By: {curr.author}</h4>
      </div>
    ));
  }

  render(){

    console.log(this.state)

    return(
      <div className='app'>
      <div className = 'site-head'>
        <h1 className = 'page-header'>CP - ZONE</h1>
      </div>
      <h2>Start writing your new blog here....</h2>
      <form onSubmit={this.submit} className='blog-form'>
          <div className="form-input">
            <input
              type = "text"
              name = "title"
              className = 'form-text'
              padding = "10px"
              required = "true"
              placeholder = "Title of your new blog"
              value = {this.state.title}
              onChange = {this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name = "body"
              value = {this.state.body}
              required = "true"
              className = 'form-content'
              onChange = {this.handleChange}
              placeholder = "Start writing here..."
            />
          </div>
          <div className = "form-input">
            <input
              type = "text"
              className = 'form-text'
              name = "author"
              required = "true"
              placeholder = "Your Name"
              value = {this.state.author}
              onChange = {this.handleChange}
            />
          </div>
          <button className = 'button submitButton'>
            Post Blog
          </button>
        </form>

        <hr></hr>

        <h1>Past Blogs</h1>

        <div className = "blog-posts">
          {this.displayBlogPosts(this.state.posts)}
        </div>

        <br></br>
        <br></br>

        
        
        <p className='goodbye'>Made with &hearts; by  <a href='https://github.com/Ankitcode99' target='_blank'>AnkitCode99</a></p>

      </div>
    )
  }
}


export default App;