/**
 * @fileoverview Example to parse the resource to the format of Quantumult X.
 *
 * @supported Quantumult X (v1.0.8-build253)
 */

// $resource, $notify(title, subtitle, message)
// HTTP reqeust and persistent storage related APIs are not supported in resource parser.

// $resource.link contains the original URL of the resource or the path if the resource is local.
// $resource.content contains the response(UTF8) from the URL .

// $done({error : "error description"});
// $done({content : "the modified content"});

function parseResource(content) {
    // Split content by lines
    const lines = content.split('\n');
    const result = lines.map(line => {
        line = line.trim();
        if (line.includes('/')) {
            // Identify IPv4 and IPv6 CIDR
            if (line.includes(':')) {
                // IPv6 CIDR
                return `ip6-cidr, ${line}, proxy`;
            } else {
                // IPv4 CIDR
                return `ip-cidr, ${line}, proxy`;
            }
        } else {
            // Return the original line if it doesn't match the pattern
            return line;
        }
    });
    return result.join('\n');
}

try {
    // Get the original content
    const originalContent = $resource.content;

    // Parse the content
    const parsedContent = parseResource(originalContent);

    // Return the modified content
    $done({ content: parsedContent });
} catch (error) {
    // Handle any errors
    $done({ error: error.message });
}