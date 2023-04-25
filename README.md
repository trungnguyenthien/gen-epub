## Sample

```sh
node egen.js --content ./contents --cover ./covers --output output --single 0
```

Trong đó

- --content: Đường dãn thư mục/file của file nội dung, định dạng file này là json
- --cover: Đường dẫn thư mục/file chứa ảnh cover của mỗi epub, định dạng PNG, JPG, GIF,...
- --output: Đường dẫn thư mục trả về file epub sau khi tạo
- --single: 0: Xử lý nhiều file epub trong 1 thư mục, trường hợp này yêu cầu --content, --cover là thư mục, khi đó tool sẽ trộn lẫn content và cover với nhau. 1: Xử lý duy nhất 1 file.

## Format file json content:

```json
[
  {
    "content": "<HTML CONTENT OF CHAPTER>"
  }
]
```
