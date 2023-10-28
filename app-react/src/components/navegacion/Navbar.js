import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/Inicio'>Inicio</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Graficas
                                    </Link>
                                    <ul className="dropdown-menu">
                                        
                                        <li><Link className="dropdown-item" to='/PieC'>Aprobados</Link></li>
                                        <li><Link className="dropdown-item" to='/Prueba'>Cursos + alumnos</Link></li>
                                        <li><Link className="dropdown-item" to='/Notas'>Promedio de alumnos</Link></li>
                                        <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );

}

export default NavBar;