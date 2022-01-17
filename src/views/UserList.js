// https://youtu.be/V-uYjDnuXkU?t=4339

import React, { useContext } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
// import users from '../data/User'
import UsersContext from '../context/usersContext';

export default props => {
    // console.warn(Object(user))

    // const ctx = useContext(UsersContext);
    // console.warn(Object.keys(ctx.state.users));
    const { state, dispatch } = useContext(UsersContext);

    function confirmUserDeletion(user) {
        Alert.alert("Excluir o usuário", "Deseja excluir o usuário?", [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ]);
    }
    

    function getUserItem({ item: user }) {
        return (
            // <ListItem
            //     key={user.id}
            //     title={user.name}
            //     subtitle={user.email}
            //     bottomDivider
            // />
            <TouchableOpacity 
                style={styles.listItem}
                key={user.id}
                onPress={() => props.navigation.navigate("UserForm", user)}
            >
                <Avatar source={{uri: user.avatarUrl}} />
                <Text>{user.name}</Text>
                {/* <Text style={styles.descriptions}>{user.email}</Text> */}
                <Button 
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" style={styles.actions} />} 
                    onPress={()=> {
                        confirmUserDeletion(user);
                    }}    
                />
            </TouchableOpacity>

            // <Text>{user.name} | {user.email}</Text>
        )
    }

    return (
        <View>
            <FlatList 
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        
    },
    descriptions: {
        marginLeft: 5,
        flexDirection: 'row',
        
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})