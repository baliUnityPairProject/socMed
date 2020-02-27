function msgGenerate(newData){
    let output_msg =
    `<h4>Congratulation! You have successfully create socMed account</h4>
    <h5>Account Detail:</h5>
    <ul>
        <li>Username: ${newData.username}</li>
        <li>Name: ${newData.name}</li>
        <li>Email: ${newData.email}</li>
        <li>Gender: ${newData.gender}</li>
    </ul>
    <br>
    <h5>Thank You</h5>`

    return output_msg
}

module.exports = msgGenerate