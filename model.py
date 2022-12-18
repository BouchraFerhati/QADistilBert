import streamlit as st
from transformers import pipeline 

@st.cache(allow_output_mutation=True)
def load_model():
    question_answerer = pipeline("question-answering", model='Desak/distilbert-base-uncased-finetuned-squad')
    return question_answerer


qa = load_model()
st.title("Question Answering")
articles = st.text_area("Context/Article")
quest = st.text_input("Question")
button = st.button("Answer")
with st.spinner("Finding Answer..."):
    if button and articles:
        answers = qa(question=quest, context=articles)
        st.success(answers)