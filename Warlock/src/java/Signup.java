
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class Signup extends HttpServlet 
{
    

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException 
    {
        try{
        res.setContentType("text/html");
        PrintWriter pw = res.getWriter();
        
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        Connection con = DriverManager.getConnection("jdbc:sqlserver://ACE-10;database=twilight;user=sa;password=Apt@1234");
        
        PreparedStatement stmt = con.prepareStatement("insert into t11 values(?,?,?,?,?)");
        req.getRequestDispatcher("link.html").include(req,res);
        String name = req.getParameter("name");
        String Uname = req.getParameter("username");
        String pswd = req.getParameter("password");
        String cpswd = req.getParameter("cpassword");
        String gen = req.getParameter("gender");
        String qual = req.getParameter("qual");
        String hobby = req.getParameter("hobby");
        
        if(pswd.equals("") || cpswd.equals(""))
        {
            req.getRequestDispatcher("signup.html").include(req, res);
            pw.print("<br>Please Enter the password. ");
        }
        else if(!pswd.equals(cpswd))
        {
            req.getRequestDispatcher("signup.html").include(req, res);
            pw.print("Password and confirm password do not match");
        }
        else 
        {
            if(gen.equals("") && qual.equals("") && hobby.equals(""))
            {
                req.getRequestDispatcher("signup.html").include(req, res);
                pw.print("Please fill in all the details");
            }
            else
            {
                stmt.setString(1,name);
                stmt.setString(2,Uname);
                stmt.setString(3,pswd);
                stmt.setString(4,gen);
                stmt.setString(5,qual);
                stmt.setString(6,hobby);
                stmt.executeUpdate();
                req.getRequestDispatcher("signup.html").include(req, res);
                req.getRequestDispatcher("login").include(req, res);
                pw.print("<br>Your Account has been created!");
                pw.print("<br>Go to Login Page to access your account");
            }
            
                
        }
        }catch(Exception e){System.out.println("Error is "+e);
    }
    }
}


