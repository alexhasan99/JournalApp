package kurdistan.journalapp;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;

import java.io.PrintStream;

public class SystemOutToLogger {
    private static final Logger logger = LogManager.getLogger(SystemOutToLogger.class);

    public static void setup() {

        System.setOut(createLoggingProxy(System.out));
        System.setErr(createLoggingProxy(System.err));
    }


    private static PrintStream createLoggingProxy(final PrintStream realPrintStream) {
        return new PrintStream(realPrintStream) {
            public void println(final String string) {
                logger.info(string);
            }
            // Implement other methods as needed
        };
    }
}
