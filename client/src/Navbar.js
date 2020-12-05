import React,{Component} from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Toolbar.css'

function Toolbar()
{
  const history=useHistory();
		return(
			<div style={{margin:'0 30px 0 0'}}>
		   <nav className="navbar navbar-light navbar-expand-md" style={{height: '75px', position: 'fixed', zIndex: 10, width: '100%', backgroundColor: '#ffffff'}}>
        <div className="container-fluid"><a className="navbar-brand" href="#" style={{fontSize: '25px', textAlign: 'center', fontWeight: 800, color: '#13694d'}}>LOGO</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav d-xl-flex flex-grow-1 justify-content-end align-items-center">
              <li className="nav-item" role="presentation"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/forked">Forked Posts</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/signin">Signin</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/create">Create Post</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="#">About</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="#">Contact Us</a></li>
              <li className="nav-item" role="presentation" style={{margin: '0 20px'}}><button className="btn btn-primary" type="button" style={{padding: '5px 10px', borderRadius: '10px', backgroundColor: '#13694d'}}><Link to="/signup">Signup</Link></button></li>
              <li className="nav-item" role="presentation" className="nav-link">
            <button className="btn btn-primary" type="button" style={{padding: '5px 10px', borderRadius: '10px', backgroundColor: '#13694d'}}
            onClick={()=>{
                localStorage.clear()
                history.push('/signin')
            }}>Logout</button>
           </li>
            </ul>
          </div>
        </div>
      </nav>
        </div>
		)
}

export default Toolbar;