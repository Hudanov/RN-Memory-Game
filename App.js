import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";

import Header from "./components/Header";
import Score from "./components/Score";
import Card from "./components/Card";
import helpers from "./helpers";

import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB-vDjlWA1gP5t_JGVUMxxTsz7JufDLxzU",
    authDomain: "rn-rep.firebaseapp.com",
    databaseURL: "https://rn-rep.firebaseio.com",
    projectId: "rn-rep",
    storageBucket: "rn-rep.appspot.com",
    messagingSenderId: "1648489531",
    appId: "1:1648489531:web:9c98bf7ff37303f71e981e"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.renderCards = this.renderCards.bind(this);
        this.resetCards = this.resetCards.bind(this);

        let sources = {
            fontawesome: FontAwesome,
            entypo: Entypo,
            ionicons: Ionicons,
        };

        let cards_level_3 = [

            {
                src: "fontawesome",
                name: "heart",
                color: "red",
            },
            {
                src: "entypo",
                name: "feather",
                color: "#7d4b12",
            },
            {
                src: "entypo",
                name: "flashlight",
                color: "#f7911f",
            },
            {
                src: "entypo",
                name: "flower",
                color: "#37b24d",
            },
            {
                src: "entypo",
                name: "moon",
                color: "#ffd43b",
            },
            {
                src: "entypo",
                name: "youtube",
                color: "#FF0000",
            },
        ];

        let cards_level_2 = [

            {
                src: "fontawesome",
                name: "heart",
                color: "red",
            },
            {
                src: "entypo",
                name: "feather",
                color: "#7d4b12",
            },
            {
                src: "entypo",
                name: "flashlight",
                color: "#f7911f",
            },
            {
                src: "entypo",
                name: "flower",
                color: "#37b24d",
            },
        ];

        let cards = [
            {
                src: "fontawesome",
                name: "heart",
                color: "red",
            },
            {
                src: "entypo",
                name: "feather",
                color: "#7d4b12",
            },
            // {
            //     src: "entypo",
            //     name: "flashlight",
            //     color: "#f7911f",
            // },
            // {
            //     src: "entypo",
            //     name: "flower",
            //     color: "#37b24d",
            // },
            // {
            //     src: "entypo",
            //     name: "moon",
            //     color: "#ffd43b",
            // },
            // {
            //     src: "entypo",
            //     name: "youtube",
            //     color: "#FF0000",
            // },
            // {
            //     src: "entypo",
            //     name: "shop",
            //     color: "#5f5f5f",
            // },
            // {
            //     src: "fontawesome",
            //     name: "github",
            //     color: "#24292e",
            // },
            // {
            //     src: "fontawesome",
            //     name: "skype",
            //     color: "#1686D9",
            // },
            // {
            //     src: "fontawesome",
            //     name: "send",
            //     color: "#1c7cd6",
            // },
            // {
            //     src: "ionicons",
            //     name: "ios-magnet",
            //     color: "#d61c1c",
            // },
            // {
            //     src: "ionicons",
            //     name: "logo-facebook",
            //     color: "#3C5B9B",
            // },
        ];

        let clone = JSON.parse(JSON.stringify(cards));

        this.cards = cards.concat(clone);

        clone = JSON.parse(JSON.stringify(cards_level_2));
        this.cards_level_2 = cards_level_2.concat(clone);

        clone = JSON.parse(JSON.stringify(cards_level_3));
        this.cards_level_3 = cards_level_3.concat(clone);


        this.cards.map((obj) => {
            let id = Math.random().toString(36).substring(7);
            obj.id = id;
            obj.src = sources[obj.src];
            obj.is_open = false;
        });

        this.cards_level_2.map((obj) => {
            let id = Math.random().toString(36).substring(7);
            obj.id = id;
            obj.src = sources[obj.src];
            obj.is_open = false;
        });

        this.cards_level_3.map((obj) => {
            let id = Math.random().toString(36).substring(7);
            obj.id = id;
            obj.src = sources[obj.src];
            obj.is_open = false;
        });


        this.cards = this.cards.shuffle();
        this.cards_level_2 = this.cards_level_2.shuffle();
        this.cards_level_3 = this.cards_level_3.shuffle();

        this.state = {
            current_selection: [],
            selected_pairs: [],
            score: 0,
            cards: this.cards,
            level: 1
        };
    }

    storeHighScore(userId, score) {
        firebase
            .database()
            .ref('users/' + "1")
            .set({
                highscore: score,
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.body}>{this.renderRows.call(this)}</View>
                <Score score={this.state.score} />
                <Button
                    onPress={this.resetCards}
                    title="RESET"
                    color="#169442"
                />
            </View>
        );
    }

    resetCards() {
        let cards = this.cards.map((obj) => {
            obj.is_open = false;
            return obj;
        });

        cards = cards.shuffle();

        this.setState({
            current_selection: [],
            selected_pairs: [],
            cards: cards,
            score: 0,
        });
    }

    newLevelCards() {
        let cards_level_2 = this.cards_level_2.map((obj) => {
            obj.is_open = false;
            return obj;
        });

        cards_level_2 = cards_level_2.shuffle();

        this.setState({
            current_selection: [],
            selected_pairs: [],
            cards: cards_level_2,
            score: 0,
            level: 2
        });
    }
    
    thirdLevelCards() {
        let cards_level_3 = this.cards_level_3.map((obj) => {
            obj.is_open = false;
            return obj;
        });

        cards_level_3 = cards_level_3.shuffle();

        this.setState({
            current_selection: [],
            selected_pairs: [],
            cards: cards_level_3,
            score: 0,
            level: 3
        });
    }

    renderRows() {
        let contents = this.getRowContents(this.state.cards);
        return contents.map((cards, index) => {
            return (
                <View key={index} style={styles.row}>
                    {this.renderCards(cards)}
                </View>
            );
        });
    }

    renderCards(cards) {
        return cards.map((card, index) => {
            return (
                <Card
                    key={index}
                    src={card.src}
                    name={card.name}
                    color={card.color}
                    is_open={card.is_open}
                    clickCard={this.clickCard.bind(this, card.id)}
                />
            );
        });
    }

    clickCard(id) {

        let selected_pairs = this.state.selected_pairs;
        let current_selection = this.state.current_selection;
        let score = this.state.score;

        let index = this.state.cards.findIndex((card) => {
            return card.id == id;
        });

        let cards = this.state.cards;

        if (
            cards[index].is_open == false &&
            selected_pairs.indexOf(cards[index].name) === -1
        ) {
            cards[index].is_open = true;

            current_selection.push({
                index: index,
                name: cards[index].name,
            });

            if (current_selection.length == 2) {
                if (current_selection[0].name == current_selection[1].name) {
                    score += 1;
                    selected_pairs.push(cards[index].name);
                } else {
                    cards[current_selection[0].index].is_open = false;

                    setTimeout(() => {
                        cards[index].is_open = false;
                        this.setState({
                            cards: cards,
                        });
                    }, 500);
                }

                current_selection = [];
            }

            this.setState({
                score: score,
                cards: cards,
                current_selection: current_selection,
            });
            selected_pairs.length == 2 && this.state.level == 1 ? this.newLevelCards() : console.log("not yet");
            selected_pairs.length == 4 && this.state.level == 2 ? this.thirdLevelCards() : console.log("not yet");
            if ( selected_pairs.length == 2 && this.state.level == 1) {
                firebase
                    .database()
                    .ref('users/' + '1')
                    .set({
                        score:  2,
                    });
            } else if (selected_pairs.length == 4 && this.state.level == 2) {
                firebase
                    .database()
                    .ref('users/' + '1')
                    .set({
                        score:  6,
                    });
            } else if(selected_pairs.length == 6 && this.state.level == 3) {
                firebase
                    .database()
                    .ref('users/' + '1')
                    .set({
                        score:  12,
                    });
            }
        }
    }

    getRowContents(cards) {
        let contents_r = [];
        let contents = [];
        let count = 0;
        cards.forEach((item) => {
            count += 1;
            contents.push(item);
            if (count == 4) {
                contents_r.push(contents);
                count = 0;
                contents = [];
            }
        });

        return contents_r;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#7AD7FF",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    body: {
        flex: 18,
        justifyContent: "space-between",
        padding: 10,
        marginTop: 20,
    },
});
