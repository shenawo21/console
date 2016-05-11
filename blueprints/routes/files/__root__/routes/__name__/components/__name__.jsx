import React from 'react' 

export class <%= pascalEntityName %> extends React.Component {

  render() {
    return (
      <%if (type === 'table') {%>
            
      <div>Table <%= pascalEntityName %></div>
      
      <%} else {%>
      <div>Form <%= pascalEntityName %></div>
      <% } %>
    )
  }
}
 