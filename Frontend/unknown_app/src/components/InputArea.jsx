import { useState, useCallback } from "react";
import { createEditor, Editor, Transforms, Element } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";

const S = {
    main: { maxWidth: 860, margin: "0 auto", padding: "32px 20px 80px" },
    card: { background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 14, padding: "24px 28px", marginBottom: 16 },
    boldbtn: (isBold) => ({padding: "7px 18px", borderRadius: 7, border: "none",
        // border: isBold ? "0.5px solid #e5e7eb" : "none", 
        background: isBold ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#fff", color: isBold ? "#fff" : "#6b7280", fontSize: 13, fontWeight: 500, cursor: "pointer",}),
    italicbtn: (isItalic) => ({padding: "7px 18px", borderRadius: 7, border: "none",
        // border: isItalic ? "0.5px solid #e5e7eb" : "none", 
        background: isItalic ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#fff", color: isItalic ? "#fff" : "#6b7280", fontSize: 13, fontWeight: 500, fontStyle: "italic", fontFamily: " Arial, Segoe UI, sans-serif", cursor: "pointer",}),
    underlinebtn: (isUnderline) => ({padding: "7px 18px", borderRadius: 7, border: "none",
        // border: isItalic ? "0.5px solid #e5e7eb" : "none", 
        background: isUnderline ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#fff", color: isUnderline ? "#fff" : "#6b7280", fontSize: 13, fontWeight: 500, textDecoration: "underline", fontFamily: " Arial, Segoe UI, sans-serif", cursor: "pointer",}),
    strikethroughbtn: (isStrikethrough) => ({padding: "7px 18px", borderRadius: 7, border: "none",
        // border: isItalic ? "0.5px solid #e5e7eb" : "none", 
        background: isStrikethrough ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#fff", color: isStrikethrough ? "#fff" : "#6b7280", fontSize: 13, fontWeight: 500, textDecoration: "line-through", fontFamily: " Arial, Segoe UI, sans-serif", cursor: "pointer",}),
    lineheightchangebtn: {padding: "7px 5px 7px 10px", borderRadius: 7, border: "none", background: "#fff", color: "#6b7280", fontSize: 13, fontWeight: 500, fontFamily: " Arial, Segoe UI, sans-serif", cursor: "pointer"},
    fontsizechangebtn: {padding: "7px 5px 7px 10px", borderRadius: 7, border: "none", background: "#fff", color: "#6b7280", fontSize: 13, fontWeight: 500, fontFamily: " Arial, Segoe UI, sans-serif", cursor: "pointer"},

    submitbtn: (disabled) => ({
      width: "100%", padding: "12px", borderRadius: 8,
      background: disabled ? "#f3f4f6" : "linear-gradient(135deg,#2563eb,#7c3aed)",
      color: disabled ? "#9ca3af" : "#fff", border: "none",
      cursor: disabled ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 500, marginTop: 16,
    }),
}

const BoldButton = () => {
  const editor = useSlate()
  const isBold = CustomEditor.isBoldMarkActive(editor)

  return (
    <button
      style={S.boldbtn(isBold)}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleBoldMark(editor)
      }}
    >
      B
    </button>
  )
}

const ItalicButton = () => {
  const editor = useSlate()
  const isItalic = CustomEditor.isItalicMarkActive(editor)

  return (
    <button
      style={S.italicbtn(isItalic)}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleItalicMark(editor)
      }}
    >
      I
    </button>
  )
}

const UnderlineButton = () => {
  const editor = useSlate()
  const isUnderline = CustomEditor.isUnderlineMarkActive(editor)

  return (
    <button
      style={S.underlinebtn(isUnderline)}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleUnderlineMark(editor)
      }}
    >
      U
    </button>
  )
}

const StrikethroughButton = () => {
  const editor = useSlate()
  const isStrikethrough = CustomEditor.isStrikethroughMarkActive(editor)

  return (
    <button
      style={S.strikethroughbtn(isStrikethrough)}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleStrikethroughMark(editor)
      }}
    >
      S
    </button>
  )
}

const LineHeightChangeButton = () => {
  const editor = useSlate();

  const currentLineHeight = CustomEditor.getLineHeight(editor);

  return (
    <>
      <select
        style={S.lineheightchangebtn}
        value={currentLineHeight}
        onChange={(e) => {
          const value = Number(e.target.value);

          CustomEditor.setLineHeight(
            editor,
            value
          );
        }}
      >
        <option value={1}>1.0</option>
        <option value={1.2}>1.2</option>
        <option value={1.5}>1.5</option>
        <option value={2}>2.0</option>
      </select>
    </>
  );
};

const ChangeFontSizeByParagraphLevelButton = () => {
  const editor = useSlate();

  const currentFontSize = CustomEditor.getFontSizeByParagraphLevel(editor);

  return (
    <>
      <select
        style={S.fontsizechangebtn}
        value={currentFontSize}
        onChange={(e) => {
          const value = e.target.value;

          CustomEditor.setFontSizeByParagraphLevel(
            editor,
            value
          );
        }}
      >
        <option value={"16px"}>通常</option>
        <option value={"32px"}>h1</option>
        <option value={"24px"}>h2</option>
        <option value={"18.72px"}>h3</option>
      </select>
    </>
  );
};

const ChangeFontSizeByWordLevelButton = () => {
  const editor = useSlate();

  const currentFontSize = CustomEditor.getFontSizeByWordLevel(editor);

  return (
    <>
      <select
        style={S.fontsizechangebtn}
        value={currentFontSize}
        onChange={(e) => {
          const value = e.target.value;

          CustomEditor.setFontSizeByWordLevel(
            editor,
            value
          );
        }}
      >
        <option value={"10px"}>10</option>
        <option value={"12px"}>12</option>
        <option value={"14px"}>14</option>
        <option value={"16px"}>16</option>
        <option value={"18px"}>18</option>
        <option value={"20px"}>20</option>
        <option value={"22px"}>22</option>
        <option value={"24px"}>24</option>
      </select>
    </>
  );
};

const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  },

  isItalicMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  isUnderlineMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },

  isStrikethroughMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.strikethrough === true : false;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  },
  
  toggleStrikethroughMark(editor) {
    const isActive = CustomEditor.isStrikethroughMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "strikethrough");
    } else {
      Editor.addMark(editor, "strikethrough", true);
    }
  },

  getLineHeight(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => 
        Element.isElement(n) &&
        n.type === "paragraph",
    });

    return match
      ? match[0].lineHeight || 1
      : 1;
  },

  setLineHeight(editor, value) {
    Transforms.setNodes(
      editor,
      {
        lineHeight: value,
      },
      {
        match: n =>
          Element.isElement(n) &&
          n.type === "paragraph",
      }
    );
  },

  getFontSizeByParagraphLevel(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => 
        Element.isElement(n) &&
        n.type === "paragraph",
    });

    return match
      ? match[0].fontSize || "16px"
      : "16px";
  },

  setFontSizeByParagraphLevel(editor, value) {
    Transforms.setNodes(
      editor,
      {
        fontSize: value,
      },
      {
        match: n =>
          Element.isElement(n) &&
          n.type === "paragraph",
      }
    );
  },

  getFontSizeByWordLevel(editor) {
    const marks = Editor.marks(editor);

    return marks
      ? marks.fontSize || "16px"
      : "16px";
  },

  setFontSizeByWordLevel(editor, value) {
    Editor.addMark(editor, "fontSize", value);
  },

}

const initialValue = [
    {
        type: 'paragraph',
        lineHeight: 1,
        fontSize: "16px",
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {  
  return (
    <p 
      {...props.attributes}
        style={{
        margin: "0.5em",
        lineHeight: props.element.lineHeight || 1,
        fontSize: props.element.fontSize || "16px",
    }}>
      {props.children}
    </p>
  )
}

const Leaf = props => {
   const {
    bold,
    italic,
    underline,
    strikethrough,
    color,
    backgroundColor,
    fontSize,
  } = props.leaf;
  
  return (
    <span
      {...props.attributes}
      style={{ 
        fontWeight: bold ? 'bold' : 'normal',
        fontStyle: italic ? "italic" : "normal",
        textDecoration: [
          underline && "underline",
          strikethrough && "line-through"
        ].filter(Boolean).join(" "),
        ...(fontSize ? { fontSize } : {}),
      }}
    >
      {props.children}
    </span>
  )
}

export default function InputArea() {

    const [editor] = useState(() => withReact(createEditor()))

    const [content, setContent] = useState(initialValue);
    const isEmpty = content.every(node =>
      node.children.every(child => child.text.trim() === "")
    );

    const renderElement = useCallback(props => {
        switch (props.element.type) {
        case 'code':
            return <CodeElement {...props} />
        default:
            return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback(props => {
      return <Leaf {...props} />
    }, [])

    // MongDBに保存
    const handleSubmit = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/memos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content,
            }),
          }
        );

        const data = await response.json();

        console.log(data);

        alert("保存成功");
      } catch (error) {
        console.error(error);

        alert("保存失敗");
      }
    };

    return (
        <>
        <div style={S.main}>
            <div style={S.card}>
                <Slate
                  editor={editor}
                  initialValue={initialValue}
                  onChange={value => {
                    setContent(value);

                    const isAstChange = editor.operations.some(
                      op => 'set_selection' !== op.type
                    )
                    if (isAstChange) {
                      // Save the value to Local Storage.
                      const content = JSON.stringify(value)
                      localStorage.setItem('content', content)
                    }
                  }}
                >
                <div style={{ display: "flex", gap: 4, background: "#f3f4f6", borderRadius: 9, padding: 4, marginBottom: 20, width: "fit-content" }}>
                  <BoldButton />
                  <ItalicButton />
                  <UnderlineButton />
                  <StrikethroughButton />
                  <LineHeightChangeButton />
                  <ChangeFontSizeByParagraphLevelButton />
                  <ChangeFontSizeByWordLevelButton />
                </div>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        style={{
                            outline: "none",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                          }}
                    />
                </Slate>
              <button 
                style={S.submitbtn(isEmpty)}
                onClick={handleSubmit}
                disabled={isEmpty}>
                  送信
              </button>
            </div>
        </div>
        </>
    )
}

