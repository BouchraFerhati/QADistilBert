import React, { Component } from "react";


class App extends Component{
  render(){
    return(
      <div className="p-5">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              
              <div className="card">
                <div className="card-header"> Question Answering </div>
                <div className="card-body">
                  <form>
                    <div className="mb-4">
                      <label htmlFor="context"className="form-label">Context</label>
                      <input type="text" name="context" id="context" className="form-control"/>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="question"className="form-label">Question</label>
                      <input type="text" name="question" id="question" className="form-control"/>
                    </div>
                    <button type="submit" className="col-md-12 btn btn-primary btn-block">Compute</button>
                    <div className="mb-4">
                      <label htmlFor="answer"className="form-label">Answer</label>
                      <input type="text" name="answer" id="answer" className="form-control"/>
                    </div>

                  </form>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default App;
