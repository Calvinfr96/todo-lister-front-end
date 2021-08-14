import React, { useState } from 'react'

function UserSelector({users, currentUser, setCurrentUser, setHeaderText}) {
    const options = users.map(user => <option key={user.id} value={`${user.id}-${user.name}`} >{user.name}</option>)

    const [optionValue, setOptionValue] = useState("none")

    function handleSelection(event) {
        const [userID, userName] = event.target.value.split('-')
        setOptionValue(event.target.value)
        setCurrentUser(userID)
        setHeaderText(`${userName}'s To Do's`)
    }

    return (
        <div>
            <span>Select User to View Tasks: </span>
            <select value={optionValue} onChange={handleSelection}>
                <option value="none" disabled>Select User</option>
                {options}
            </select>
        </div>
    )
}

export default UserSelector