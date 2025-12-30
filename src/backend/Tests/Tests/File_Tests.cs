using System;
using System.Collections.Generic;
using System.IO;
using static ZLBlog.Tests.Tests.FileProcessor;


namespace ZLBlog.Tests.Tests
{
    public class File_Tests
    {
        [Theory]
        [InlineData(@"C:\Users\blurl\Downloads\products.xlsx", "C:\\Users\\blurl\\Downloads\\products.csv")]
        public void Convert_To_Csv_Test(string excelFilePath, string csvFilePath)
        {
            //string excel = @"C:\Data\MultiSheet.xlsx";
            // string csv = @"C:\Data\AllSheets.csv";

            ExcelOpenXml2Csv.Convert(excelFilePath, csvFilePath, includeSheetNameColumn: true);
            Console.WriteLine("Done.");
        }
    }
}
