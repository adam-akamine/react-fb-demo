const CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className = "commentForm" onSubmit={this.handleSubmit}>
         <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
        <h1>{this.state.author}</h1>
        <h1>{this.state.text}</h1>
      </form>
    );
  }
});

const Comment = React.createClass({
  rawMarkup: function () {
    let md = new Remarkable();
    const rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className = "comment">
        <h2 className = "commentAuthor">
          {this.props.author}
        </h2>
        <span
          dangerouslySetInnerHTML={ this.rawMarkup() }
        />
      </div>
    );
  }
});

const data = [
  {
    author: "Tony",
    text: "Wow, so awesome"
  },
  {
    author: "Jesse",
    text: "Iknowrite"
  }];

const CommentList = React.createClass({
  render: function() {
    const commentNodes = this.props.data.map(function(comment, index) {
      return (
        <Comment
          key = {index}
          author = {comment.author}>
          {comment.text}
        </Comment>
      );
    })
    return (
      <div className = "commentList">
        { commentNodes }
      </div>
    );
  }
});

const CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {data: []}
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList
          data = { this.state.data }
        />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url = "/api/comments" pollInterval = {2000}/>,
  document.getElementById('app')
);