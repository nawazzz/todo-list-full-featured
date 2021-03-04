import React from "react"
import './App.css';
import List from "./List"

class App extends React.Component {
  state = {
    textByUser: "",
    allTodo: [],
    filteredTab: [],
    view: "all"
  }
  textEnteredByUser = (e) => {
    this.setState({
      textByUser: e.target.value,
      // isCompleted: false,
      // id: Math.floor(Math.random()*90000) + 10000
    })
    console.log(this.state)
  }
  submitUserText = (e) => {
    if (this.state.textByUser.length < 1) {
      return
    }
    // console.log(e,"e")
    const objWithUserText = {
      text: this.state.textByUser,
      isCompleted: false,
      id: Math.floor(Math.random()*90000) + 10000
    }
    if (e.type === "click" || e.charCode === 13) {
      this.setState({
        allTodo: [...this.state.allTodo, objWithUserText],
        textByUser: ""
      })
    }
    console.log(this.state.allTodo)
  }
  deleteListElement = (id) => {
    // console.log(id, "e")
    const deletedListArray = this.state.allTodo.filter((elm, index) => {
      if (id !== elm.id) {
        return true
      }
    })
    this.setState({
      allTodo: deletedListArray
    })
    console.log(deletedListArray)
  }
  markAsCompleted = (obj) => {
    // console.log(obj)
    const completedTodo = this.state.allTodo.map((elm, index) => {
      if (elm.id === obj.id) {
        return {
          ...elm,
          isCompleted: !elm.isCompleted
        }
      } else {
        return elm
      }

    })
    console.log(completedTodo)

    this.setState({
      allTodo: completedTodo
    })
    return obj
  }

  updateList = (text, id) => {
    console.log(text)
    this.setState({
      textByUser: text
    })
    this.deleteListElement(id)
  }
  
  completedTodo = (e) => {
      const doneTodo = this.state.allTodo.filter((elm, index) => {
        if (elm.isCompleted === true) {
          return true
        }
      })
      this.setState({
        filteredTab: doneTodo,
        view: "completed"
      })
    
  }
  renderAllTodo = (e) => {
    this.setState({
      filteredTab: this.state.allTodo
    })
  }
  remainingTodo = (e) => {
    const todoLeft = this.state.allTodo.filter((elm, index) => {
      if (elm.isCompleted === false) {
        return true
      }
    })
    console.log(todoLeft)
    this.setState({
      filteredTab: todoLeft,
      view: "remaining"
    })
  }

  render() {
    // console.dir(this)
    return (
      <div className="App">
        <h1>todos</h1>
        <div>
          <input type="text" value={this.state.textByUser} onKeyPress={this.submitUserText} onChange={this.textEnteredByUser} placeholder="What needs to be done"/>
          <button onClick={this.submitUserText}>Submit</button>
          <div>
            <button onClick={this.renderAllTodo} >All</button>
            <button onClick={this.completedTodo}>Completed</button>
            <button onClick={this.remainingTodo}>Remaining</button>
          </div>
          <List allTodo={this.state.allTodo} submitUserText={this.submitUserText} deleteListElement={this.deleteListElement} markAsCompleted={this.markAsCompleted} updateList={this.updateList} filteredTab={this.state.filteredTab} view={this.state.view} />
          
        </div>
      </div>
    )
  }
}


export default App;

// Attach an "onChange" listener in the input tag
// Write a method "textEnteredbyUser" which will put the input value in the state.text
// Add an attribute "Value" within the input tag and set it to "this.state.text"
// 


// create list component list.js
// add onChange event on input tag and on Click event on submit button
// write methods for the event listener
// Create 
// <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
//         </header>
