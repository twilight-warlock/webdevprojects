import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public class LogoutServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException 
    {
        res.setContentType("text/html");
        PrintWriter pw = res.getWriter();
        req.getRequestDispatcher("link.html").include(req, res);
        HttpSession session = req.getSession();
        session.invalidate();
        pw.print("<br>You have logged out successfully!");
        req.getRequestDispatcher("loginhomepage.html").include(req, res);
    }


}
