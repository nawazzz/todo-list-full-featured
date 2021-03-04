import React from "react"

class List extends React.Component {

  render() {

    return(
      <div>
        <div>
          <ul>
          {this.props.view === "completed" || this.props.view === "remaining" ? 
            this.props.filteredTab.map((elm,index) => {
              return (
                <div>                  
                  <li 
                    style={{textDecoration: `${elm.isCompleted === true ? "line-through" : "none"}`}} onClick={() => this.props.updateList(elm.text, elm.id)}
                  >
                    <input checked={elm.isCompleted} onClick={(e) => {
                      e.stopPropagation()
                      this.props.markAsCompleted(elm)
                      }} type="checkbox"/>
                    <span>{elm.text}</span>
                    <span onClick={(e) => {
                      e.stopPropagation()
                      this.props.deleteListElement(elm.id)
                      }}>x</span>
                  </li>
                </div>
              )
            } ): this.props.allTodo.map((elm,index) => {
              return (
                <div>                  
                  <li 
                    style={{textDecoration: `${elm.isCompleted === true ? "line-through" : "none"}`}} onClick={() => this.props.updateList(elm.text, elm.id)}
                  >
                    <input checked={elm.isCompleted} onClick={(e) => {
                      e.stopPropagation()
                      this.props.markAsCompleted(elm)
                      }} type="checkbox"/>
                    <span>{elm.text}</span>
                    <span onClick={(e) => {
                      e.stopPropagation()
                      this.props.deleteListElement(elm.id)
                      }}>x</span>
                  </li>
                </div>
              )
            } )
          }
          </ul>
        </div>
      </div>
    )
  }
}
export default List;