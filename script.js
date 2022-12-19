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
            tabs: [
                {
                    text: "All"
                },
                {
                    text: "School"
                },
                {
                    text: "Hobbies"
                },
            ],
            activeTab: 0,
            text: "",
            editText: "",
            editItemId: 0,
            modalClassName: "modal",
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault()
        this.setState(function (state) {
            let newItem = {
                text: state.text
            }
            let items = state.items
            if (state.text != "") {
                items.push(newItem)
            }
            return {
                items: items,
                text: "",
            }
        })
    }

    // handleDeleteAll(e) {
    //     this.setState(function (state) {
    //         let items = []
    //         return{
    //             items: items,
    //         }
    //     })
    // }

    handleDelete(id) {
        this.setState(function (state) {

            let items = state.items
            items.splice(id, 1)
            return {
                items: items,
            }
        })
    }

    handleEditStart(id) {
        this.setState(function (state) {
            let modalClassName = state.modalClassName
            modalClassName = modalClassName + " modalShow"
            return {
                modalClassName: modalClassName,
                editText: state.items[id].text,
                editItemId: id,
            }
        })
    }

    handleEditClose() {
        this.setState(function (state) {
            let modalClassName = state.modalClassName
            modalClassName = "modal"
            return {
                modalClassName: modalClassName,
            }
        })
    }

    handleEditSubmit(e) {
        e.preventDefault()
        this.setState(function (state) {
            let modalClassName = state.modalClassName
            modalClassName = "modal"

            let newItems = state.items
            newItems[state.editItemId].text = state.editText
            return {
                modalClassName: modalClassName,
                items: newItems,
            }
        })
    }

    changeColor(e) {
        e.target.style.color = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")"
    }

    handleCheck(e) {
        if (e.target.style.textDecoration == "line-through") {
            e.target.style.textDecoration = "none"
        }
        else {
            e.target.style.textDecoration = "line-through"
        }
        console.log(window.getComputedStyle(e.target, null).getPropertyValue("text-decoration-line"));
    }

    handleTabChange(id) {
        this.setState(function (state) {
            return {
                activeTab: id,
            }
        })
    }

    render() {
        return (
            <div>
                <div className={this.state.modalClassName}>
                    <form action="">
                        <h2>Edit:</h2>
                        <input type="text" value={this.state.editText} onChange={(e) => this.setState({ editText: e.target.value })} />
                        <button onClick={(e) => this.handleEditSubmit(e)}>🖊️</button>
                        <button onClick={() => this.handleEditClose()} type="button" id="closeEdit">❌</button>
                    </form>
                </div>
                <form action="" onSubmit={(e) => this.handleSubmit(e)}>
                    <h1 onClick={(e) => this.changeColor(e)}>ToDo App</h1>
                    <button id="addTab">+Tab</button>
                    <ul>
                        {
                            this.state.tabs.map((tab, id) => (
                                <Tab handleTabChange={this.handleTabChange} tab={tab.text} key={id} activeTab={this.state.activeTab} id={id}></Tab>
                            ))
                        }
                    </ul>
                    <ol>
                        {
                            this.state.items.map((item, id) => (
                                <li key={id}>
                                    <p onClick={(e) => this.handleCheck(e)}>{item.text}</p>
                                    <div className="buttonContainer">
                                        <button onClick={() => this.handleEditStart(id)} type="button">🖊️</button>
                                        <button onClick={() => this.handleDelete(id)} type="button">🗑️</button>
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                    <input type="text" value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} />
                    <button>📌</button>
                    <button onClick={() => this.setState({ items: [] })} type="button">💣</button>
                </form>
            </div>
        )
    }
}
class Tab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let sign = ""
        // if (this.props.activeTab == this.props.id) {
        //     sign = "!"
        // }
        // else{
        //     sign = ""
        // }
        return (
            <li onClick={() => this.props.handleTabChange(this.props.id)} className={this.props.activeTab == this.props.id ? "activeTab" : ""}>
                <p>{this.props.tab + sign}</p>
            </li>
        )
    }
}
root.render(<App></App>);