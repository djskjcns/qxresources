// 获取原始内容
let content = $resource.content || "";

// 将内容切割成行
let lines = content.split("\n");

// 存储解析后的内容
let parsedLines = [];

// 正则表达式匹配
const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}(\/\d+)?$/; // 匹配IPv4
const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}(\/\d+)?$/; // 匹配IPv6
const ipAsnRegex = /^IP-ASN,\d+$/; // 匹配IP-ASN,<数字>

// 逐行处理
lines.forEach(line => {
    // 去除前后空格
    line = line.trim();

    // 移除行内注释（从'//'或'#'开始）
    line = line.split("//")[0].split("#")[0].trim();

    // 忽略空行
    if (line === "") {
        return;
    }

    // 如果是IPv4地址
    if (ipv4Regex.test(line)) {
        parsedLines.push(`ip-cidr, ${line}, proxy`);
    }
    // 如果是IPv6地址
    else if (ipv6Regex.test(line)) {
        parsedLines.push(`ip6-cidr, ${line}, proxy`);
    }
    // 如果是IP-ASN地址
    else if (ipAsnRegex.test(line)) {
        parsedLines.push(`${line}, proxy`);
    }
});

// 将解析后的内容拼接成字符串
let result = parsedLines.join("\n");

// 返回最终结果
$done({ content: result });