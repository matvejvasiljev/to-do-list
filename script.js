const root = ReactDOM.createRoot(
    document.getElementById('root')
);
// function Welcome(props) {
//     return <h1>Hello, {props.name}. Could you be so kind to give me {props.food}?</h1>;
// }
// function Party(props) {
//     return <div>
//         <Welcome name="Кирилл" food="a boul of soup"></Welcome>
//         <Welcome name="Матвей" food="a piece of pizza"></Welcome>
//         <Welcome name="Николай" food="a burger"></Welcome>
//     </div>
// }
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                {
                    text: "Погулять с собаками.",
                },
                {
                    text: "Сделать уроки.",
                },
            ],
            text: "",
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        console.log(12345);
        this.setState(function (state) {
            let newItem = {
                text: this.state.text
            }
            let items = state.items
            items.push(newItem)
            return{
                items: items,
            }
        })
    }
    render() {
        return (
            <form action="" onSubmit={(e) => this.handleSubmit(e)}>
                <h1>ToDo App</h1>
                <ol>
                    {
                        this.state.items.map((item, id) => (
                            <li key={id}>
                                <p>{item.text}</p>
                                <div className="buttonContainer">
                                    <button type="button">🖊️</button>
                                    <button type="button">🗑️</button>
                                </div>
                            </li>
                        ))
                    }
                </ol>
                <input type="text" value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} />
                <button>📌</button>
                <button type="button">💣</button>
            </form>
        );
    }
}

root.render(<App></App>);

// сделать чтобы текст добавлялся из input
// попробовать сделать кнопку бомбы (удаления всего)