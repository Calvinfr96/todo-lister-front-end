import React from 'react'

function UserSelector({users, currentUser, setCurrentUser}) {
    const options = users.map(user => <option key={user.id} value={user.id} >{user.name}</option>)

    function handleSelection(event) {
        setCurrentUser(event.target.value)
    }
    return (
        <div>
            <span>Select User to View Tasks: </span>
            <select value={currentUser} onChange={handleSelection}>
                <option value="none" disabled>Select User</option>
                {options}
            </select>
        </div>
    )
}

export default UserSelector