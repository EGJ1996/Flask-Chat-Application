<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Flask_Chat_App</title>
  </head>
  <body>

    <h3 style='color: #ccc;font-size: 30px;'>No message yet..</h3>
    <div class="message_holder"></div>

    <form action="" method="POST">
      <input type="text" class="username" placeholder="User Name"/>
      <input type="text" class="message" placeholder="Messages"/>
      <input type="submit"/>
    </form>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>
    <script type="text/javascript">
      var socket = io.connect('http://' + document.domain + ':' + location.port);

      socket.on( 'connect', function() {
        socket.emit( 'my event', {
          data: 'User Connected'
        } )
        var form = $( 'form' ).on( 'submit', function( e ) {
          e.preventDefault()
          let user_name = $( 'input.username' ).val()
          let user_input = $( 'input.message' ).val()
          socket.emit( 'my event', {
            user_name : user_name,
            message : user_input
          } )
          $( 'input.message' ).val( '' ).focus()
        } )
      } )
      socket.on( 'my response', function( msg ) {
        console.log( msg )
        if( typeof msg.user_name !== 'undefined' ) {
          $( 'h3' ).remove()
          $( 'div.message_holder' ).append( '<div><b style="color: #000">'+msg.user_name+'</b> '+msg.message+'</div>' )
        }
      })
    </script>

  </body>
  </html>