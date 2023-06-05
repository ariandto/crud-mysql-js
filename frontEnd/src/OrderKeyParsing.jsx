import React from 'react';
import './OrderKeyParsing.css';

function OrderKeyParsing() {
  const mergeStringsAndCopy = () => {
    // Get the output textbox element
    var outputTextbox = document.getElementById("outputTextbox");

    // Merge strings
    var inputText = document.getElementById("inputTextbox").value;
    var cleanedString = inputText.replace(/[\s;]/g, '');
    var characters = cleanedString.split('');
    var uniqueGroups = [];
    var currentGroup = '';

    for (var i = 0; i < characters.length; i++) {
      currentGroup += characters[i];

      if (currentGroup.length === 6) {
        if (!uniqueGroups.includes(currentGroup)) {
          uniqueGroups.push(currentGroup);
        }
        currentGroup = '';
      }
    }

    var finalString = '000' + uniqueGroups.join('; 000');

    // Set the merged string in the output textbox
    outputTextbox.value = finalString;

    // Copy the merged string to clipboard
    outputTextbox.select();
    outputTextbox.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Text copied to clipboard!");
  };

  return (
    <div className="order-key-parsing">
      <div className="order-key-parsing-inner">
        <h3>Order-Key Parsing KLS</h3>
        <label htmlFor="inputTextbox" name="input"placeholder='Oke'></label>
        <input type="text" id="inputTextbox" name="inputTextbox" />

        <br />

        <label htmlFor="outputTextbox"></label>
        <input type="text" id="outputTextbox" name="outputTextbox" readOnly />

        <br />

        <button onClick={mergeStringsAndCopy}>Process Copy to Clipboard</button>
      </div>
    </div>
  );
}

export default OrderKeyParsing;