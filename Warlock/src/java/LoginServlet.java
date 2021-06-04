import static java.io.FileDescriptor.out;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.lang.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public class LoginServlet extends HttpServlet
{
    
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException
    {
        try{
    
        res.setContentType("text/html");
        PrintWriter pw = res.getWriter();
        
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        Connection con = DriverManager.getConnection("jdbc:sqlserver://ACE-10;database=twilight;user=sa;password=Apt@1234");
        
        //req.getRequestDispatcher("link.html").include(req,res);
        String name = req.getParameter("username");
        String pswd = req.getParameter("password");
        
        if(pswd.equals(""))
            {
                req.getRequestDispatcher("login.html").include(req, res);
                pw.print("<br><h2><center>Please Enter the password. </center></h2>");
            }
        
        PreparedStatement stmt = con.prepareStatement("select * from t11 where username=? and pass=? ");
        stmt.setString(1, name);
        stmt.setString(2, pswd);
        
        ResultSet rs = stmt.executeQuery();
        if(rs.next())
        {
                HttpSession session = req.getSession();
                session.setAttribute("uname",name);
                req.getRequestDispatcher("postloginlink.html").include(req,res);
                pw.print("<br><p>You have logged in successfully!!</p> ");
                pw.print("<br>Hello "+rs.getString(1));
                req.getRequestDispatcher("loginhomepage.html").include(req,res);
        }
        else
        {
            req.getRequestDispatcher("login.html").include(req, res);
            pw.print("<br>The Username or Password entered is invalid");
        }
        
    }catch(Exception e){System.out.print("<br>The exception is : "+e);}

   
    }
}
