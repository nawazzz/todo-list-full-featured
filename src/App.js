import React from "react"
import List from "./List"
import "./App.scss"

class App extends React.Component {
  state = {
    textByUser: "",
    allTodo: [],
    filteredTab: [],
    view: "all"
  }

  componentDidMount() {
    const savedTodos = JSON.parse(window.localStorage.getItem('allTodo'));
    if (!savedTodos) {
      return
    }
      
      else if (savedTodos.length > 0) {
      this.setState({
        allTodo: savedTodos
      })
    }
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
        allTodo: [objWithUserText, ...this.state.allTodo],
        textByUser: ""
      }, () => {
        window.localStorage.setItem("allTodo", JSON.stringify(this.state.allTodo))
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
    }, () => {
      window.localStorage.setItem("allTodo", JSON.stringify(this.state.allTodo))
    })
    // window.localStorage.setItem("allTodo", JSON.stringify(this.state.allTodo))

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
    // console.log(completedTodo)

    this.setState({
      allTodo: completedTodo
    }, () => {
      window.localStorage.setItem("allTodo", JSON.stringify(this.state.allTodo))
    })
    console.log(window.localStorage.allTodo)
  }

  updateList = (text, id) => {
    console.log(text)
    this.setState({
      textByUser: text
    })
    this.deleteListElement(id)
    // window.localStorage.setItem("allTodo", JSON.stringify(this.state.allTodo))

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
    }, () => {
      window.localStorage.setItem("allTodo", JSON.stringify(this.state.allTodo))
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
    }, () => {
      window.localStorage.setItem("allTodo", JSON.stringify(this.state.filteredTab))
    })
  }
  clearCompleted = () => {
    const filtered = this.state.allTodo.filter((elm, index) => {
      if (elm.isCompleted !== true) {
        return true
      }  
    })
    this.setState({
      allTodo: filtered
    })  
  }

  render() {
    // console.dir(this)
    return (
      <div className="divContainer">
        <h1>todos</h1>
        <div className="inputContainer">
          <div className="header">
            <input type="text" value={this.state.textByUser} onKeyPress={this.submitUserText} onChange={this.textEnteredByUser} placeholder="What needs to be done"/>
            <button className="submitButton" onClick={this.submitUserText}>Submit</button>
          </div>
          <div style={{display: `${this.state.allTodo && this.state.allTodo.length < 1 ? "none" : "block"}`}} className="counterAndMenuContainer" >
            <div  style={{display: "flex", justifyContent: "space-between"}}  >
              <div>
              
                {this.state.allTodo && this.state.allTodo.length} items left
              </div>
              <div>
                <button onClick={this.renderAllTodo} >All</button>
                <button onClick={this.completedTodo}>Completed</button>
                <button onClick={this.remainingTodo}>Remaining</button>
              </div>
              <div>
                <a href="#" 
                onClick={this.clearCompleted}   
                >clearCompleted</a>                
              </div>
            </div>
          </div>
          <List allTodo={this.state.allTodo} submitUserText={this.submitUserText} deleteListElement={this.deleteListElement} markAsCompleted={this.markAsCompleted} updateList={this.updateList} filteredTab={this.state.filteredTab} view={this.state.view} filtered={this.clearCompleted}  />
          
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
