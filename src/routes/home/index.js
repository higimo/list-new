import { Link } from 'preact-router'

const Home = () => (
	<div class="home">
		<h1>Список списков</h1>
		<Link href="/list-list">Корень</Link>
	</div>
)

export default Home
