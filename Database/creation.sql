CREATE DATABASE [BVS]
USE [BVS]
GO
/****** Object:  Table [dbo].[VolumeSlider]    Script Date: 2023/05/18 11:05:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VolumeSlider](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](500) NOT NULL,
 CONSTRAINT [UQ_VolumeSlider] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VolumeSliderClicks]    Script Date: 2023/05/18 11:05:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VolumeSliderClicks](
	[VolumeSliderId] [bigint] NOT NULL,
	[Clicks] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VolumeSliderReview]    Script Date: 2023/05/18 11:05:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VolumeSliderReview](
	[VolumeSliderId] [bigint] NOT NULL,
	[Date] [datetime] NOT NULL,
	[Review] [varchar](500) NOT NULL,
	[Rating] [decimal](1, 0) NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[VolumeSliderClicks] ADD  CONSTRAINT [DF_VolumeSliderClicks_Clicks]  DEFAULT ((0)) FOR [Clicks]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpsertVolumeSlider]    Script Date: 2023/05/18 11:05:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpsertVolumeSlider] 
	@Name VARCHAR(500) 
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @RowCount INT = 0;
	SELECT 
		@RowCount = COUNT([Name])
	FROM dbo.VolumeSlider
	WHERE [Name] = @Name
	GROUP BY [Name]

	SELECT @RowCount

	IF @RowCount = 0
		BEGIN
			INSERT INTO [dbo].[VolumeSlider]
					   ([Name])
				 VALUES
					   (@Name)

			INSERT INTO [dbo].[VolumeSliderClicks] 
				(
				VolumeSliderId, 
				Clicks
				)
			SELECT 
				vs.Id, 
				1
			FROM [dbo].[VolumeSlider] AS vs
			WHERE vs.[Name] = @Name
		
		END
	ELSE
		BEGIN
	   		MERGE INTO [VolumeSliderClicks] AS vsc
				USING (SELECT Id, [Name] FROM [dbo].[VolumeSlider]) AS src
					ON src.Id =  vsc.VolumeSliderId
					AND src.[Name] = @Name
			WHEN MATCHED THEN
				UPDATE 
					SET Clicks = Clicks + 1
			;
		END

END
GO


CREATE PROCEDURE [dbo].[sp_CreateReview] 
	@Name VARCHAR(500),
	@Review VARCHAR(500),
	@Rating DECIMAL(1,0)
AS
BEGIN
	DECLARE @id BIGINT

	SET @id = (SELECT TOP(1) Id FROM dbo.VolumeSlider WHERE [Name] = @Name)
	
	INSERT INTO [dbo].[VolumeSliderReview]
           ([VolumeSliderId]
           ,[Date]
           ,[Review]
           ,[Rating])
     VALUES
           (@id,
		   GETDATE(),
           @Review,
           @Rating)
END

GO