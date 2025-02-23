export default function MainHeader() {
    return (
        <header className="background-main">
        <main className="main">
            <h1 className="main-title">Car is 
                <a href="" className="typewrite" data-period="3000" data-type='[ "Creative", "Future", "Enterteinment", "Freedom" ]'>
                    <span className="wrap"></span>
                </a>
            </h1>
        </main>
        <div className="text-center">
            <a className="main-link btn btn-lg"  href="">
                See more
                <i className="fa fa-chevron-down"></i>
            </a> 
        </div>
    </header>
    )
}