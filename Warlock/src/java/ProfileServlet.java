import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public class ProfileServlet extends HttpServlet 
{
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException 
    {
        res.setContentType("text/html");
        PrintWriter pw = res.getWriter();
        req.getRequestDispatcher("postloginlink.html").include(req, res);
        
        HttpSession session = req.getSession(false);
        if(session!=null)
        {
            String name = (String)session.getAttribute("uname");
            if(!name.equals(""))
            {
                pw.print("<br>Welcome to My Profile");
                pw.print("<br>What up "+name+"?");
            }
        }
        else
        {
            req.getRequestDispatcher("login.html").include(req, res);
            pw.print("<br>Please Login First!");
        }
    
    }

}
