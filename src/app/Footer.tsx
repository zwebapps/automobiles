export default function Footer () {
    return (
        <footer className="footer text-center">
        <div className="container">
            <ul className="list-inline mb-5">
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white mr-3" href="#">
                    <i className="fab fa-facebook-f"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white mr-3" href="#">
                    <i className="fab fa-twitter"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white mr-3" href="#">
                    <i className="fas fa-car-crash"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white" href="#">
                    <i className="fab fa-github"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white" href="#">
                        <i className="fab fa-instagram"></i>
                    </a>
                </li>
            </ul>
            <p className="text-muted small mb-0">Copyright &copy; Majestic Journey 2025</p>
        </div>
    </footer>
    )
}