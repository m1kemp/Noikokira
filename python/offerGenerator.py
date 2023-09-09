import mysql.connector as conn
import json
import sys


databaseName = "noikokira"
productsFileName = "products_utf8.json"

def connectToDB():
    db = conn.connect(
        host = "localhost",
        user = "rootUser",
        password = "rootUser"
    )
    query = db.cursor()
    return query

def openJson(fileName):
    with open(fileName, encoding='utf-8') as file:
        data = json.load(file)
        dataUni = json.dumps(data, ensure_ascii=False)
        #data = json.loads(dataUni.encode('utf-8'), ensure_ascii=False)

    return data




def main():
    query = connectToDB()
    #query.execute("USE " + databaseName)

    jsonData = openJson(productsFileName)
    #print(str(jsonData['products']).encode('utf-8'))

    for i in (jsonData['products']):
        try:
            print(i)
        except:
            #print(" α ".encode('utf-8'), end="")
            #print(str(i).encode('utf-8'))
            pass

if __name__ == "__main__":
    main()